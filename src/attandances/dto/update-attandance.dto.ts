import { PartialType } from '@nestjs/swagger';
import { CreateAttandanceDto } from './create-attandance.dto';

export class UpdateAttandanceDto extends PartialType(CreateAttandanceDto) {}
