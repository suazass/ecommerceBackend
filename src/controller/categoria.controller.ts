/**
 * Clase donde se definen los metodos a exponer por parte del servicio de metodos de mensajes
 * @author Carlos Cuero
 */
import { BadRequestException, Body, Controller, Get, Param, Put, Query, Post, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import generalConfig from 'src/common/configuration/general.config';
import Traceability from 'src/common/lib/traceability';
import { MethodMessage } from 'src/common/utils/enums/mapping-api-rest';
import { ETaskMessageGeneral } from 'src/common/utils/enums/message.enum';
import { EStatusTracingGeneral } from 'src/common/utils/enums/tracing.enum';
import GeneralUtil from 'src/common/utils/generalUtil';
import { IServiceTracingUc } from 'src/core/use-case/resource/service-tracing.resource.uc';
import { ResponseService } from './dto/response-service.dto';
import { Etask } from 'src/common/utils/enums/taks.enum';
import { ICategoryDTO } from './dto/categoria/categoria.dto';
import Logging from 'src/common/lib/logging';
import { ELevelsErros } from 'src/common/utils/enums/logging.enum';
import { ICategoriaService } from './service/categoria.service';


@ApiTags(generalConfig.controllerCategoria)
@Controller(`${generalConfig.apiVersion}${generalConfig.controllerCategoria}`)

export class CategoriController {

    private readonly logger = new Logging(CategoriController.name);

  constructor(private readonly _CategoriaService: ICategoriaService, private readonly _serviceTracing: IServiceTracingUc) { }

    @Post()
    @ApiOperation({
      description: "Crea un nuevo registro de categoria"
    })
    @ApiResponse({ type: ResponseService })
    create(@Body() createCategoriaDto: ICategoryDTO) {
      this.logger.write(`create()`, Etask.CREATE, ELevelsErros.INFO);
      return this._CategoriaService.create(createCategoriaDto);
    }

    @Get()
    @ApiOperation({
      description: "consulta todas las categorias guardadas"
    })
    @ApiResponse({ type: ResponseService })
    findAll(@Query('page') _page: number, @Query('limit') _limit: number) {
      this.logger.write(`findAll()`, Etask.FINDALL, ELevelsErros.INFO);
      return this._CategoriaService.findAll( _page, _limit);
    }

    @Get(MethodMessage.GETBYID)
    @ApiOperation({
    description: 'Obtener categoria por id'
    })
    @ApiResponse({ type: ResponseService })
    message(@Param('Id') _id: string) {
    if (!GeneralUtil.validateValueRequired(_id))
        throw new BadRequestException(
        'Debe indicar el identificador del mensaje.',
        );
    // save traceability of request 
    let traceability = new Traceability({origen: `${generalConfig.apiVersion}${generalConfig.controllerMessage}`});
    traceability.setStatus(EStatusTracingGeneral.STATUS_SUCCESS);
    traceability.setDescription(ETaskMessageGeneral.GET_BY_ID);
    traceability.setTask(ETaskMessageGeneral.GET_BY_ID);
    this._serviceTracing.createServiceTracing(traceability.getTraceability());

    return this._CategoriaService.getById(_id);
    }


    @Put()
    @ApiOperation({
    description: 'Actualizar una categoria'
    })
    @ApiResponse({ type: ResponseService })
    update(@Body() catego: ICategoryDTO) {
      return this._CategoriaService.update(catego);
    }

    @Delete(':id')
    @ApiOperation({
        description: "Elimina registro de la categoria"
    })
    @ApiResponse({ type: ResponseService })
    remove(@Param('id') id: string) {
        return this._CategoriaService.remove(id);
    }
}


