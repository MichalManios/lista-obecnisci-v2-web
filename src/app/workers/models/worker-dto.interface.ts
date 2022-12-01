import { Section } from '../../app-components/sections/model/section.interface';
import { FunctionDTO } from '../../app-components/function/model/function-dto.interface';

export interface WorkerDTO {
  id: number;

  name: string;

  surname: string;

  section: Section;

  function: FunctionDTO;
}
