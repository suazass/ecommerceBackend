/**
 * Se almacena la configuracion de los nombres de los métodos que se usan
 * @author Carlos Cuero
 */

export default {
  apiMapping: process.env.API_MAPPING || '/RSEcommerceJS',
  apiVersion: process.env.API_VERSION || 'api/V1',
  controllerMessage: process.env.CONTROLLER_MESSAGE || '/Message',
  controllerCategoria: process.env.CONTROLLER_MESSAGE || '/categories',
  controllerProducto: process.env.CONTROLLER_MESSAGE || '/products',
  controllerHttpProvider: process.env.CONTROLLER_HTTP_PROVIDER || '/HttpProvider',
  controllerError: process.env.CONTROLLER_ERROR || '/errors',
  port: process.env.PORT || 8088,
  logLevel: process.env.LOG_LEVEL || 'ALL',
  ttlCache: Number(process.env.TTL_CACHE || 0)
}