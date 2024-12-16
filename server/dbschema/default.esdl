module default {
  type User {
    required name: str;
    required email: str {
      constraint exclusive;
    }
    picture: str;
    required google_id: str;
    created_at: datetime;
    updated_at: datetime;
  }

  type Trip {
    required city: str;
    required description: str;
    required user: User;
    created_at: datetime;
    updated_at: datetime;
  }

  type Local {
    required name: str;
    required description: str;
    required address: str;
    required opening_hours: str;
    tags: array<str>;
    required price: str;
    required google_link: str;
    required trip: Trip;
  }
}
