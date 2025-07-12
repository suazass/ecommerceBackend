import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { HttpPruebaController } from './http-prueba.controller';
import { IHttpPruebaService } from './service/http-prueba.service';
import { HttpPruebaService } from './service/impl/http-provider.service.impl';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { DataProviderModule } from 'src/data-provider/data-provider.module';
import { CategoriController } from './categoria.controller';
import { ICategoriaService } from './service/categoria.service';
import { CategoriaService } from './service/impl/categoria.service.impl';
import { ProductoController } from './producto.conttroller';
import { IProductoService } from './service/producto.service';
import { ProductoService } from './service/impl/produto.service.impl';

@Module({
  imports: [CoreModule, TerminusModule, DataProviderModule],
  controllers: [ HttpPruebaController, HealthController, CategoriController,ProductoController ],
  providers: [
    { provide: IHttpPruebaService, useClass: HttpPruebaService },
    { provide: ICategoriaService, useClass: CategoriaService },
    { provide: IProductoService, useClass: ProductoService }
  ],
})
export class ControllerModule {}
