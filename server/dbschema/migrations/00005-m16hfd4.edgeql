CREATE MIGRATION m16hfd4grk2chf4mhhqgs62onmlwsiuv5ja7fycwrlotgoc5hdgacq
    ONTO m153jiiluharpbefbhrp66t5vb22xxdjkgghzzqyjgg6kt277wcvsa
{
  ALTER TYPE default::Local {
      ALTER PROPERTY googleLink {
          RENAME TO google_link;
      };
  };
  ALTER TYPE default::Local {
      ALTER PROPERTY openingHours {
          RENAME TO opening_hours;
      };
  };
};
