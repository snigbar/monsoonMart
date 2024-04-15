export const bankDataUrl =
  "https://gist.githubusercontent.com/snigbar/a547e5d9de70c94a98e56f16f1b0a5ba/raw/de412dc1584d8ba70ae262edd937c65b1d7b228d/BDbanks.json";
export interface Branch {
  routing_number: string;
  branch_name: string;
  branch_slug: string;
  branch_code: string;
  swift_code: string;
  address: string;
  telephone: string;
  email: string;
  fax: string;
}

export interface BankDistricts {
  district_name: string;
  branches: Branch[];
}

export interface BankData {
  slug: string;
  bank_code: string;
  name: string;
  districts: BankDistricts[];
}

export interface District {
  _id: string;
  district: string;
  coordinates: string;
  upazilla: string[];
}

export interface TLocationApiResponse {
  status: {
    code: number;
    message: string;
    date: string;
  };
  data: District[];
}
