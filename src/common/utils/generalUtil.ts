/**
 * Clase con metodos utilitarios como transformacion de data
 * @author Carlos Cuero
 */
const rTracer = require('cls-rtracer');
const path = require("path");
const FS = require("fs");
import generalConfig from '../configuration/general.config';
import { BusinessException } from '../lib/business-exceptions';
import { EmessageMapping } from "./enums/message.enum";
import * as moment from 'moment';
import { MappingStatusCode } from '../configuration/mapping-statuscode';
import { ETaskDesc, Etask } from './enums/taks.enum';
import Logging from '../lib/logging';
import { ELevelsErros } from './enums/logging.enum';
import { HttpStatus } from '@nestjs/common';
import { EStatusTracingGeneral, ETaskTracingGeneral } from './enums/tracing.enum';
import Traceability from '../lib/traceability';
const xml2js = require('xml2js');
export default class GeneralUtil {

  public static get getCorrelationalId(): string {
    return rTracer.id() || '';
  }

  /**
   * Función para validar que request envia el usuario en una petición API
   * @param {any} obj arreglo con información recibida de la API
   * @returns Boolean si existe información
   */
  public static isEmptyObject(obj: any) {
    return Object.getOwnPropertyNames(obj).length !== 0;
  }


  /**
  * Convierte data con estructura xml a objeto en formato JSON
  * @param {*}xml string con estructura xml a transformar
  * @returns JSON resultado de la transformación
  */
  public static async convertXmlToJson(xml: any): Promise<any> {
    if (GeneralUtil.validateValueRequired(xml)) {

      // return await xmlParser.xmlToJson(v, (err, json) => {
      const parser = new xml2js.Parser(
        {
          explicitArray: false,
          xmlns: false,
          attrValueProcessors: [function cleanOutput(value, name) {
            return (name.startsWith('xmlns:')) ? undefined : value;
          }],
        });

      return parser.parseStringPromise(xml).then((result) => {
        new Logging(GeneralUtil.name).write('Result JSON transform from XML =>  ' + JSON.stringify(result), Etask.VALIDATE_REQUEST);
        return JSON.parse(JSON.stringify(result));
      })
        .catch(function (err) {
          new Logging(GeneralUtil.name).write('Error transformando xml a json.' + JSON.stringify(err), Etask.VALIDATE_REQUEST, ELevelsErros.WARNING);
          throw new Error(`Error transformando xml a JSON. ${err}`);
        });
    }
    else
      return null;
  }


  /**
   * Limpia los valores y/o propiedades de un JSON
   * @param {*}json objeto JSON a limpiar
   * @param {string[]} replaceValues Arregalo de valores a remplazar del json
   * @param {string} replaceBy caracter por el cual se reemplazaran los valores indicados.
   * @returns Objeto json con valores reemplazados
   */
  public static cleanProperties(json: any, replaceValues: string[], replaceBy: string = ''): any {
    let jsonString = JSON.stringify(json);

    replaceValues.forEach(value => {
      jsonString = jsonString.replace(new RegExp(value, 'ig'), replaceBy);
    });

    return JSON.parse(jsonString);
  }

  /**
   * Valida el tipo de campo de un registro
   * @param {String} value tipo de campo del valor enviado
   * @returns {String} resultado de homologación si el tipo de campo es correcto
   */
  public static validateValueRequired(value: string | number): boolean {
    if (value == undefined || value == null)
      return false; 

    if (typeof value === 'number')
      return value >= 0

    if (typeof value === 'string')
      return !(value === "undefined" || value.trim().length == 0)

    return false;
  }

  /**
   * Retorna url de origen de las solicitudes recibidas por el ms
   * @param {String} url url recibida en el ms 
   * @returns {String} url de origen
   */
  public static getOrigin(url: string): string {
    return `${generalConfig.apiMapping}${(url?.includes('?')) ? url.slice(0, url.indexOf('?')) : url}`;
  }

  /**
   * Lee el archivo xml 
   * @param {*}name nombre del archivo xml 
   * @returns lectura del archivo en formato utf8
   */
  public static getTemplateXML = name => {
    const pathfile = path.resolve(`${__dirname}/xmls/${name}.xml`);
    return FS.readFileSync(pathfile, "utf8");
  };

  /**
   * Valida la diferencia de días entre dos fechas
   * @param {Date} date1 primera fecha a valida
   * @param {Date} date2 segunda fecha a valida
   * @returns {Number} resultado diferencia de días de las dos fechas
   */
  public static validateDate(date1: Date, date2: Date): number {
    // With Date object we can compare dates them using the >, <, <= or >=.
    // The ==, !=, ===, and !== operators require to use date.getTime(),
    // so we need to create a new instance of Date with 'new Date()'
    const d1 = new Date(date1); const d2 = new Date(date2);
 
    // Check if the dates are equal
    const same = d1.getTime() === d2.getTime();
    if (same) return 0;

    // Check if the first is greater than second
    if (d1 > d2) return 1;

    // Check if the first is less than second
    if (d1 < d2) return -1;

    // To calculate the time difference of two dates
    const Difference_In_Time = d2.getTime() - d1.getTime();

    // To calculate the no. of days between two dates
    return Difference_In_Time / (1000 * 3600 * 24);
  }

  /**
   * Obtiene la fecha y hora actual
   * @returns La fecha y hora cuando se ejecuta
   */
  public static getDateUTC() {
    return moment().format();
  }

  /**
   * Genera excepciones de negocio 
   * @param {*} document 
   * @param {EmessageMapping} message tipo de excepcion
   * @param {MappingStatusCode} status estado de la excepcion
   * @param {boolean} success  estado de la operacion 
   */
  public static generateBusinessException(document: any, message: EmessageMapping, status: MappingStatusCode, success: boolean) {
    throw new BusinessException(
      status,
      message,
      success,
      { document: { orders: document } }
    );
  }

  /**
   * Valida si la variable recibida es de valor true o false
   * @param {boolean} value Valor recibido
   * @returns {boolean} true o false
   */
  public static validateBoolean(value: boolean): boolean {
    if (value !== true)
      return false
    return true
  }

  /**
  * Valida si la variable recibida contiene el mismo valor que el string recibido
  * @param {string} element Valor recibido
  * @param {string} sentence Valor recibido
  * @returns {boolean} true o false
  */
  public static validateValueAndString(element: string, sentence: string): boolean {
    if (element !== sentence)
      return false

    return true
  }

  /**
   * Valida si la variable recibida existe 
   * @param {*}element elemento recibido
   * @returns el elemento o vacio
   */
  public static ifExist(element: any): any {
    if (element)
      return element
    return ''
  }

  /**
   * Función para validar si "value" es empty
   * @param {*} value Valor recibido
   * @return {boolean} true o false
   */
  public static isEmpty(value) {
    return (this.isUndefined(value)
      || (value === "" && typeof value === "string")
      || (typeof value === "object" && Object.keys(value).length == 0)
    )
      ? true : false;
  }

  /**
   * Función para validar si "value" es undefined
   * @param {*} value Valor recibido
   * @return {boolean} true o false
   */
  public static isUndefined(value) {
    return ((value === undefined && typeof value === "undefined")
      || (value === "undefined" && typeof value === "string"))
      ? true : false;
  }

  /**
   * Función para validar si "value" es null
   * @param {*} value Valor recibido
   * @return {boolean} true o false
   */
  public static isNull(value) {
    return ((value === null && typeof value === "object")
      || (value === "null" && typeof value === "string"))
      ? true : false;
  }

  /**
   * Función para validar si "value" es null, undefined o vacío
   * La validación toma en cuenta si el null y el undefined 
   * son object o string.
   * @param {*} value valor de entrada
   * @return {boolean} true o false
   */
  public static isNullOrEmpty(value) {
    return (this.isNull(value) || this.isEmpty(value))
      ? true : false;
  }

  /**
   * Función para generar estado de error según respuesta de legado
   * @param {any} result arreglo con información respuesta de legado
   * @returns Cadena con estado de error según respuesta
   */
  public static getLevelError(result: any) {
    let levelError: ELevelsErros;
    if (!result.executed) {
      levelError = ELevelsErros.ERROR;
    } else {
      levelError = (result.status === HttpStatus.OK  || result.status === HttpStatus.CREATED) ? ELevelsErros.INFO : ELevelsErros.WARNING
    }
    return levelError
  }

  /**
   * Función para asignar tarea y descripción de error de manera global
   * @param {any} error arreglo con información de error
   * @param {Etask} task cadena con nombre de tarea del error
   * @param {ETaskDesc} taskDesc cadena de descripción de tarea del error
   * @returns Cadena con estado de error según respuesta
   */
  public static assignTaskError(error, task:Etask, taskDesc:ETaskDesc){
    error.task_name = (error.task_name !== undefined) ? error.task_name : task;
    error.task_description = (error.task_description !== undefined) ? error.task_description : taskDesc;
  }

  /**
   * Función para imprimir logs en el ciclo de vida del interceptor
   * @param {any} req objeto de la petición
   * @param {any} request body o params de la petición
   * @param {any} name nombre de la clase interceptor
   * @param {any} data respuesta final de la petición
   * @param {number} executionTime tiempo de execución de la respuesta
   */
  public static logRequestResponse( req, request, name, data?, executionTime? ){
    let message: string = 'Entrada';
    let level = ELevelsErros.INFO;
    
    if(data) {
      message = 'Salida';
      if (data.status !== 200 )
        level = ELevelsErros.WARNING;
    }
    
    message += ` Principal - ${req.url} - ${req.method}`;  
    
    new Logging(name).write(
      message,
      Etask.REQUEST_HTTP,
      level,
      request,
      data,
      executionTime
    );

  }

  /**
   * Función para guardar la trazabilidad en el ciclo de vida del interceptor
   * @param {any} req objeto de la petición
   * @param {any} request body o params de la petición
   * @param {any} data respuesta final de la petición
   * @param {number} executionTime tiempo de execución de la respuesta
   */
  public static traceabilityInterceptor( req, request, data?, executionTime? ){
    let task = ETaskTracingGeneral.INICIO_REQUEST;
    let status = EStatusTracingGeneral.STATUS_SUCCESS;
    
    let traceability = new Traceability({});
    traceability.setTransactionId(this.getCorrelationalId);
    traceability.setOrigen(req.url);
    traceability.setRequest(request);
    traceability.setMethod(req.method);

    if(data){
      traceability.setResponse(data);
      traceability.setProcessingTime(executionTime);
      task = ETaskTracingGeneral.FINAL_REQUEST;
      if (data.status !== 200 )
        status = EStatusTracingGeneral.STATUS_FAILED;
    }

    traceability.setTask(task);
    traceability.setStatus(status);
    return traceability;
  }



}


