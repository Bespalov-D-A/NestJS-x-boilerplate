import { ConsoleLogger, Global, Module  } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './modules/auth/auth.module';
import { FilesService } from './files/files.service';
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { UsersModule } from "./modules/users/users.module";
import { RolesModule } from "./modules/roles/roles.module";
import "reflect-metadata"
import { GoogleStrategy } from "./modules/auth/strategies/google.strategy";
import { DefaultConfigOptionsModule } from "./modules/default-config-options/default-config-options.module";
import { defaultConfig } from "./modules/default-config-options/config/defaultConfig";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DBoptions} from "./data-source";

const {seeds, ...DB} = DBoptions

@Module({
  controllers: [],
  providers: [
   {
        provide: ConsoleLogger,
        useValue: new ConsoleLogger(),
      },
    FilesService,
    GoogleStrategy
  ],
  imports: [
    ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    TypeOrmModule.forRoot({
     ...DB,
     entities: [__dirname + "/../**/*.entity.js"],
     autoLoadEntities: true,
     logging:true,
     synchronize: process.env.NODE_ENV === 'development',
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
    DefaultConfigOptionsModule.forRoot(defaultConfig),
  ]
})
export class AppModule {}
