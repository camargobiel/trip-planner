CREATE MIGRATION m1pan2t67fhc3ntawcr2tuevakxhl5rfwzg3n3anducly5nwp4tuya
    ONTO m1rco6njjafjjurz2as6rsaddsummqp3lo6hho43cdr4mes4eu5a4q
{
  ALTER TYPE default::User {
      ALTER PROPERTY email {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
