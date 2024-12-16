CREATE MIGRATION m1rco6njjafjjurz2as6rsaddsummqp3lo6hho43cdr4mes4eu5a4q
    ONTO initial
{
  CREATE TYPE default::User {
      CREATE PROPERTY created_at: std::datetime;
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE REQUIRED PROPERTY googleId: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE PROPERTY picture: std::str;
      CREATE PROPERTY updated_at: std::datetime;
  };
};
