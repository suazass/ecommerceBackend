import { CacheModule, Module } from '@nestjs/common';
import { DataProviderModule } from 'src/data-provider/data-provider.module';
import { IHttpPruebaUc } from './use-case/http-prueba.uc';
import { HttpPruebaUcimpl } from './use-case/impl/http-prueba.uc.impl';
import { ServiceErrorUcimpl } from './use-case/resource/impl/service-error.resource.uc.impl';
import { ServiceTracingUcimpl } from './use-case/resource/impl/service-tracing.resource.uc.impl';
import { IServiceErrorUc } from './use-case/resource/service-error.resource.uc';
import { IServiceTracingUc } from './use-case/resource/service-tracing.resource.uc';
import { ICategoriaUc } from './use-case/categoria.uc';
import { CategoriaUcimpl } from './use-case/impl/categoria.uc.impl';
import { IProductoUc } from './use-case/producto.uc';
import { ProductoUcimpl } from './use-case/impl/producto.uc.impl';

@Module({
  imports: [CacheModule.register(),DataProviderModule],
  providers: [
    { provide: IHttpPruebaUc, useClass: HttpPruebaUcimpl },
    { provide: IServiceErrorUc, useClass: ServiceErrorUcimpl },
    { provide: IServiceTracingUc, useClass:ServiceTracingUcimpl},
    { provide: ICategoriaUc, useClass: CategoriaUcimpl },
    { provide: IProductoUc, useClass: ProductoUcimpl }
  ],
  
  exports: [IHttpPruebaUc, IServiceErrorUc, IServiceTracingUc, ICategoriaUc, IProductoUc],
})
export class CoreModule {}
