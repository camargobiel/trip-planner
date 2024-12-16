CREATE MIGRATION m153jiiluharpbefbhrp66t5vb22xxdjkgghzzqyjgg6kt277wcvsa
    ONTO m1jwhunnrcozao2g7lx2gqi7goixdewz6eic6o6cmdgo2kd3wcz7ka
{
  CREATE TYPE default::Tags {
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::Trip {
      CREATE REQUIRED LINK user: default::User;
      CREATE REQUIRED PROPERTY city: std::str;
      CREATE PROPERTY created_at: std::datetime;
      CREATE REQUIRED PROPERTY description: std::str;
      CREATE PROPERTY updated_at: std::datetime;
  };
  CREATE TYPE default::Local {
      CREATE MULTI LINK tags: default::Tags;
      CREATE REQUIRED LINK trip: default::Trip;
      CREATE REQUIRED PROPERTY address: std::str;
      CREATE REQUIRED PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY googleLink: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY openingHours: std::str;
      CREATE REQUIRED PROPERTY price: std::str;
  };
};
