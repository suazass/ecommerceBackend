import { EmessageMapping } from '../utils/enums/message.enum';
import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionManager } from './exceptions-manager.filter';
import { ResponseService } from '../../controller/dto/response-service.dto';
import { CacheModule, HttpStatus } from '@nestjs/common';
import { IServiceTracingUc } from 'src/core/use-case/resource/service-tracing.resource.uc';
import { ServiceTracingUcimpl } from 'src/core/use-case/resource/impl/service-tracing.resource.uc.impl';
import { IServiceErrorUc } from 'src/core/use-case/resource/service-error.resource.uc';
import { ServiceErrorUcimpl } from 'src/core/use-case/resource/impl/service-error.resource.uc.impl';
import { DataProviderModule } from 'src/data-provider/data-provider.module';

describe('ExceptionManager Class', () => {
    it('should compile the module', async () => {
        const module = await Test.createTestingModule({
            imports: [CacheModule.register(),DataProviderModule],
            providers: [ExceptionManager,
                { provide: IServiceTracingUc, useClass: ServiceTracingUcimpl },
                { provide: IServiceErrorUc, useClass: ServiceErrorUcimpl }
            ],
            exports: [IServiceTracingUc, IServiceErrorUc],
        }).compile();

        const result = new ResponseService(false, EmessageMapping.DEFAULT_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        expect(module).toBeDefined();
        expect(result).toBeDefined();
        expect(result.status).toBe(500);
        expect(result.message).toContain(EmessageMapping.DEFAULT_ERROR)
    });
});