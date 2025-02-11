import { ImageSourcePropType } from "react-native";

declare interface JOB {
  id: string;
  name: string;
  image: ImageSourcePropType;
  slug: string;
}

declare interface SubJob {
  id: string;
  metier: string;
  slug: string;
  description: string;
}

declare interface ICATEGORY {
  name: string;
  slug: string;
}

declare interface ARTISANMETIER {
  id: string;
  metier: string;
  slug: string;
  sousMetier: SubJob[];
}

declare interface UserImage {
  name: string | null;
  imageUri: string | null;
  fileExtension: string | undefined;
}

// declare interface Artisan {
//   jobId: string;
//   subJobId: string;
//   firstName: string;
//   lastName: string;
//   city: string;
//   address: string;
//   phone: string;
//   profile: string;
//   password: string;
//   fileExtension: string;
//   fileName: string;
//   confirmPassword: string;
//   age: string;
//   availability: string[];
// }

declare interface Artisan {
  fullname: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

declare interface ArtisanFormData {
  category: string;
  sub_category: string;
  region: string;
  department: string;
  commune: string;
  address: string;
  age: string;
  price: string;
  availability: string;
  latitude: number | null;
  longitude: strnumber | nulling;
}

declare interface USER {
  id: string;
  jobId: string;
  subJobId: string;
  firstName: string;
  lastName: string;
  city: string;
  address: string;
  phone: string;
  age: number;
  profile: string;
  availability: string[];
}

declare interface USERSESSIONID {
  id: string;
}

declare type Commune = string;

declare type Region = {
  region: string;
  departments: Department[];
};

declare type Department = {
  department: string;
  communes: Commune[];
};

declare interface USERINFO {
  fullname: string;
  avatar: string;
  phone: string;
}

declare interface Review {
  id: string;
  rate: number;
  message: string;
  userId: string;
  artisanId: string;
  created_at: string;
  user: USERINFO;
}

declare interface ArtisanDetail {
  id: string;
  category: string;
  sub_category: string;
  isVerified: boolean;
  availability: string;
  region: string;
  artisanId: string;
  address: string;
  price: number | null;
  commune: string;
  age: string;
  department: string;
  latitude: string;
  longitude: string;
  user: {
    avatar: string;
    phone: string;
    fullname: string;
  };
  rating: number;
}

declare interface MESSAGE {
  avatar: string;
  fullname: string;
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  created_at: string;
  updated_at: string;
  read: boolean;
  unread_count: number;
}
