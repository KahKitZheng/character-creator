type Character = {
  head: number;
  face: number;
  "facial hair": number;
  body: number;
  standing: number;
  sitting: number;
  accessory: number;
};

type Category = {
  key: keyof Character;
  name: string;
  assets: string[];
  required: boolean;
};
