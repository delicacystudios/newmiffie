const url = require("url");
const ejs = require("ejs");
const path = require("path");
const express = require("express");
const config = require("../configs/config.js");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const { Permissions } = require("discord.js");
const GuildSettings = require("../database/settings");
const Strategy = require("passport-discord").Strategy;

const app = express();
const MemoryStore = require("memorystore")(session);

module.exports = async (client) => {
  const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);
  const templateDir = path.resolve(`${dataDir}${path.sep}templates`);

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  let domain;
  let callbackUrl;

  try {
    const domainUrl = new URL(config.domain);
    domain = {
      host: domainUrl.hostname,
      protocol: domainUrl.protocol,
    };
  } catch (e) {
    console.log(e);
    throw new TypeError("Error: You didin't provide the domain correctly");
  }

  if (config.CustomDomain) {
    callbackUrl = `${domain.protocol}//${domain.host}/callback`;
  } else {
    callbackUrl = `${domain.protocol}//${domain.host}${
      config.port == 80 ? "" : `:${config.port}`
    }/callback`;
  }

  passport.use(
    new Strategy(
      {
        clientID: config.bot.id,
        clientSecret: config.clientSecret,
        callbackURL: callbackUrl,
        scope: ["identify", "guilds"],
      },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile));
      }
    )
  );

  app.use(
    session({
      store: new MemoryStore({ checkPeriod: 86400000 }),
      secret:
				"#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n",
      resave: false,
      saveUninitialized: false
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.locals.domain = config.domain.split("//")[1];

  app.engine("ejs", ejs.renderFile);
  app.set("view engine", "ejs");

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );

  app.use("/", express.static(path.resolve(`${dataDir}${path.sep}assets`)));

  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    }

    res.render(
      path.resolve(`${templateDir}${path.sep}${template}`),
      Object.assign(baseData, data)
    )
  };

  const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    req.session.backURL = req.url
    res.redirect("/login")
  };

  app.get(
    "/login",
    (req, res, next) => {
      if (req.session.backURL) {
        req.session.backURL = req.session.backURL;
      } else if (req.headers.referer) {
        const parsed = url.parse(req.headers.referer);
        if (parsed.hostname === app.locals.domain) {
          req.session.backURL = parsed.path;
        }
      } else {
        req.session.backURL = "/";
      }
      next()
    },
    passport.authenticate("discord")
  );

  app.get(
    "/callback",
    passport.authenticate("discord", { failureRedirect: "/" }), (
      req,
      res
    ) => {
      if (req.session.backURL) {
        const backURL = req.session.backURL;
        req.session.backURL = null;
        res.redirect(backURL);
      } else {
        res.redirect("/");
      }
    }
  );

  app.get("/logout", function(req, res) {
    req.session.destroy(() => {
      req.logout()
      res.redirect("/")
    })
  });

  app.get("/", (req, res) => {
    renderTemplate(res, req, "index.ejs", {
      discordInvite: config.chat.server
    });
  });

  app.get("/dashboard", checkAuth, (req, res) => {
    renderTemplate(res, req, "dashboard.ejs", { perms: Permissions });
  });

  app.get("/dashboard/:guildID", checkAuth, async (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect("/dashboard");
    let member = guild.members.cache.get(req.user.id);
    if (!member) {
      try {
        await guild.members.fetch();
        member = guild.members.cache.get(req.user.id);
      } catch (err) {
        console.error(`Couldn't fetch the members of ${guild.id}: ${err}`)
      }
    }
    if (!member) return res.redirect("/dashboard");
    if (!member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
      return res.redirect("/dashboard");
    }

    let storedSettings = await GuildSettings.findOne({ guildID: guild.id });
    if (!storedSettings) {
      const newSettings = new GuildSettings({
        guildID: guild.id
      });
      await newSettings.save().catch((e) => {
        console.log(e)
      });
      storedSettings = await GuildSettings.findOne({ guildID: guild.id });
    }

    renderTemplate(res, req, "settings.ejs", {
      guild,
      settings: storedSettings,
      alert: null
    });
  });

  app.post("/dashboard/:guildID", checkAuth, async (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect("/dashboard");
    const member = guild.members.cache.get(req.user.id);
    if (!member) return res.redirect("/dashboard");
    if (!member.permissions.has("MANAGE_GUILD")) {
      return res.redirect("/dashboard")
    }

    let storedSettings = await GuildSettings.findOne({ guildID: guild.id });
    if (!storedSettings) {
      const newSettings = new GuildSettings({
        guildID: guild.id,
      });
      await newSettings.save().catch((e) => {
        console.log(e);
      });
      storedSettings = await GuildSettings.findOne({ guildID: guild.id });
    }

    storedSettings.prefix = req.body.prefix;
    await storedSettings.save().catch((e) => {
      console.log(e);
    });

    renderTemplate(res, req, "settings.ejs", {
      guild,
      settings: storedSettings,
      alert: "Your settings have been saved.",
    });
  });

  app.listen(config.port, null, null, () =>
    console.log(`Dashboard has been successfully started: ${config.port}`),
  );
};