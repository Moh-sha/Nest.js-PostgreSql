import { IsString, Matches } from 'class-validator';

export class AdminDTO {
  @IsString({ message: 'Invalid name !' })
  @Matches(/^[a-zA-Z]+$/, { message: 'enter a proper name' })
  name: string;
  @IsString({ message: 'Invalid email' })
  email: string;
  @IsString()
  password: string;
}

export class AdminUpdateDTO {
  id: number;
  name: string;
  email: string;
  password: string;
}

export class admincrud {
  @IsString()
  name: string;
  @IsString()
  password: string;
}
