import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import databaseConfig from '../common/configuration/database.config';
import { IHttpPruebaProvider } from './http-prueba.provider';
import { IHttpProvider } from './http.provider';
import { MessageModel, MessageSchema } from './model/message.model';
import { ParamModel, ParamSchema } from './model/param/param.model';
import { ServiceErrorModel, ServiceErrorSchema } from './model/service-error/service-error.model';
import { ServiceTracingModel, ServiceTracingSchema } from './model/service-tracing/service-tracing.model';
import { HttpPruebaProvider } from './provider/http-prueba.provider.impl';
import { HttpProvider } from './provider/http.provider.impl';
import { ServiceErrorProvider } from './provider/service-error.provider.impl';
import { ServiceTracingProvider } from './provider/service-tracing.provider.impl';
import { IServiceErrorProvider } from './service-error.provider';
import { IServiceTracingProvider } from './service-tracing.provider';
import { IServiceTracingUc } from 'src/core/use-case/resource/service-tracing.resource.uc';
import { ServiceTracingUcimpl } from 'src/core/use-case/resource/impl/service-tracing.resource.uc.impl';
import { CategoriaModel, CategoriaSchema } from './model/categoria/categoria.model';
import { ICategoriaProvider } from './categoria.provider';
import { CategoriaProvider } from './provider/categoria.provider.impl';
import { IProductoProvider } from './producto.provider';
import { ProductoProvider } from './provider/producto.provider.impl';
import { ProductoModel, ProductoSchema } from './model/producto/producto.model';


@Module({
  imports: [
    //Conexión a base de datos
    MongooseModule.forRoot(databaseConfig.database, {
      retryAttempts: 3,
      useCreateIndex: true,
      useFindAndModify: false,
      autoCreate: false,
      autoIndex: false
    }),
    MongooseModule.forFeature([
      { name: ProductoModel.name, schema: ProductoSchema, collection: 'coll_producto'},
      { name: CategoriaModel.name, schema: CategoriaSchema, collection: 'coll_categoria'},
      { name: MessageModel.name, schema: MessageSchema, collection: 'coll_message'},
      { name: ParamModel.name, schema: ParamSchema, collection: 'coll_params' },
      { name: ServiceErrorModel.name, schema: ServiceErrorSchema, collection: 'coll_service_error' },
      { name: ServiceTracingModel.name, schema: ServiceTracingSchema, collection: 'coll_traceability' },
    ]),
    HttpModule
  ],
  providers: [
    { provide: ICategoriaProvider, useClass: CategoriaProvider },
    { provide: IProductoProvider, useClass: ProductoProvider },
    { provide: IHttpProvider, useClass: HttpProvider },
    { provide: IHttpPruebaProvider, useClass: HttpPruebaProvider },
    { provide: IServiceErrorProvider, useClass: ServiceErrorProvider },
    { provide: IServiceTracingProvider, useClass: ServiceTracingProvider },
    { provide: IServiceTracingUc, useClass: ServiceTracingUcimpl},
    HttpModule
  ],
  exports: [IHttpPruebaProvider, IServiceErrorProvider, IServiceTracingProvider, IServiceTracingUc, HttpModule, ICategoriaProvider, IProductoProvider],
})
export class DataProviderModule {}
