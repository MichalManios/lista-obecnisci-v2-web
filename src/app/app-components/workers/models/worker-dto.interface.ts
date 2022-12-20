import { Section } from '../../sections/model/section.interface';
import { FunctionDTO } from '../../function/model/function-dto.interface';

export interface WorkerDTO {
  id: number;

  name: string;

  surname: string;

  section: Section;

  function: FunctionDTO;
}
