import { CustomerMapper } from '@/data/mappers';
import { RepositoryInterface } from '@/domain/@shared/contracts';
import { IntegrationInterface } from '@/framework/integrations/contracts';
import { ProviderInterface } from '@/framework/providers/contracts';
import { AppError } from '@/main/errors';
import { CustomerCreateInputDto, CustomerOutputDto } from '@/usecases/contracts/customer';

export class CreateCustomerUseCase {
    constructor(
        private readonly repository: RepositoryInterface,
        private readonly provider: ProviderInterface,
        private readonly integration: IntegrationInterface
    ) {}

    async execute(input: CustomerCreateInputDto): Promise<CustomerOutputDto> {
        const existsEntity = await this.repository.customer.findOneByDocument(input.document);

        if (existsEntity) {
            throw new AppError('customer already exists with document', 412);
        }

        let entity = CustomerMapper.dtoToEntity(input);

        entity = await this.repository.customer.create(entity);

        return CustomerMapper.entityToDto(entity);
    }
}
