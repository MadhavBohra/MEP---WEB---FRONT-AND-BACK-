import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileDetailsModule } from './user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://mep-web-user:QVo5lYD8oxWiWNCA@cluster-0.n1md1ce.mongodb.net/mep?retryWrites=true&w=majority&appName=cluster-0"), UserProfileDetailsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
