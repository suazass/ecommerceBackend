import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import generalConfig from "src/common/configuration/general.config";
import Logging from "src/common/lib/logging";
import { ResponseService } from "./dto/response-service.dto";
import { IProductoDTO } from "./dto/producto/producto.dto";
import { ELevelsErros } from "src/common/utils/enums/logging.enum";
import { Etask } from "src/common/utils/enums/taks.enum";
import { MethodMessage } from "src/common/utils/enums/mapping-api-rest";
import GeneralUtil from "src/common/utils/generalUtil";
import { IProductoService } from "./service/producto.service";

@ApiTags(generalConfig.controllerProducto)
@Controller(`${generalConfig.apiVersion}${generalConfig.controllerProducto}`)

export class ProductoController {

    private readonly logger = new Logging(ProductoController.name);

  constructor(private readonly _ProdcutoService: IProductoService) { }

    @Post()
    @ApiOperation({
      description: "Crea un nuevo registro de producto"
    })
    @ApiResponse({ type: ResponseService })
    create(@Body() createCategoriaDto: IProductoDTO) {
      this.logger.write(`create()`, Etask.CREATE, ELevelsErros.INFO);
      return this._ProdcutoService.create(createCategoriaDto);
    }

    @Get()
    @ApiOperation({
      description: "consulta todas los productos guardadas"
    })
    @ApiResponse({ type: ResponseService })
    findAll(@Query('page') _page: number, @Query('limit') _limit: number) {
      this.logger.write(`findAll()`, Etask.FINDALL, ELevelsErros.INFO);
      return this._ProdcutoService.findAll( _page, _limit);
    }

    @Get(MethodMessage.GETBYID)
    @ApiOperation({
    description: 'Obtener propdcuto por id'
    })
    @ApiResponse({ type: ResponseService })
    message(@Param('Id') _id: string) {
    if (!GeneralUtil.validateValueRequired(_id))
        throw new BadRequestException(
        'Debe indicar el identificador del prodcuto.',
        );
    return this._ProdcutoService.getById(_id);
    }


    @Put()
    @ApiOperation({
    description: 'Actualizar un producto'
    })
    @ApiResponse({ type: ResponseService })
    update(@Body() product: IProductoDTO) {
      return this._ProdcutoService.update(product);
    }

    @Delete(':id')
    @ApiOperation({
        description: "Elimina registro del producto"
    })
    @ApiResponse({ type: ResponseService })
    remove(@Param('id') id: string) {
        return this._ProdcutoService.remove(id);
    }
}