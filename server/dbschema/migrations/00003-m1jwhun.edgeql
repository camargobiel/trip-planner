CREATE MIGRATION m1jwhunnrcozao2g7lx2gqi7goixdewz6eic6o6cmdgo2kd3wcz7ka
    ONTO m1pan2t67fhc3ntawcr2tuevakxhl5rfwzg3n3anducly5nwp4tuya
{
  ALTER TYPE default::User {
      ALTER PROPERTY googleId {
          RENAME TO google_id;
      };
  };
};
