export interface ICompany {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    company: ICompany;
    userGroup: null | string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    // user: {
    //     id: string;
    //     name: string;
    //     email: string;
    //     avatar: string;
    // };
    // token: string;
}

/*
api response example:
{
  status: 'success',
  data: [
    {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODY1MGFhOThiZTIwOWQ2ZmRlMGFlNGQiLCJpYXQiOjE3NTE1NTE3MDEsImV4cCI6MTc2MDE5MTcwMX0.1JRp0s0SsW6qanWEDmc1EwmIq5zDg9z-aFDNILluCxE',
      user: [Object]
    }
  ]
}

*/

export interface ILoginResponse {
    status: 'error' | 'success';
    data: [
        {
            token: string;
            user: IUser;
        }
    ];
}
