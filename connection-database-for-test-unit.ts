import { TypeOrmModule } from '@nestjs/typeorm';
const connectionDataBaseForTest = () => [
  TypeOrmModule.forRoot({
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user-dev',
    password: '203327',
    database: 'educando',
    entities: ['./src/entity/*.entity.ts'],
    keepConnectionAlive:true
  }),
];

export { connectionDataBaseForTest }