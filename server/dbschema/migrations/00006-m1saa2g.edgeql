CREATE MIGRATION m1saa2gbzdnehfkv7t3fm3xse4fudtst5yepiq27pa4d5cx7r34aeq
    ONTO m16hfd4grk2chf4mhhqgs62onmlwsiuv5ja7fycwrlotgoc5hdgacq
{
  ALTER TYPE default::Local {
      DROP LINK tags;
  };
  ALTER TYPE default::Local {
      CREATE PROPERTY tags: array<std::str>;
  };
  DROP TYPE default::Tags;
};
