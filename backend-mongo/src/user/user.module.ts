import { Module, forwardRef } from '@nestjs/common';
import { UserProfileDetailsController } from './user-profile-details/user-profile-details.controller';
import { UserProfileDetailsService } from './user-profile-details/user-profile-details.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileSchema } from './user-profile-details/user-profile-details.model';
import { UserHealthSchema } from './user-health-details/user-health-details.model';
import { UserHealthDetailsController } from './user-health-details/user-health-details.controller';
import { UserHealthDetailsService } from './user-health-details/user-health-details.service';
import { UserDailySchema } from './user-daily-update/user-daily-update.model';
import { UserDailyDetailsController } from './user-daily-update/user-daily-update.controller';
import { UserDailyDetailsService } from './user-daily-update/user-daily-update.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'UserProfile', schema: UserProfileSchema},
      {name: 'UserHealth', schema: UserHealthSchema},
      {name: "UserDaily", schema: UserDailySchema}
    ]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UserProfileDetailsController, UserHealthDetailsController, UserDailyDetailsController],
  providers: [UserProfileDetailsService, UserHealthDetailsService, UserDailyDetailsService],
  exports: [UserProfileDetailsService] // Add this line
})
export class UserProfileDetailsModule {}