import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInitiativeDto } from './dto/create-initiative.dto';
import { UpdateInitiativeDto } from './dto/update-initiative.dto';

@Injectable()
export class InitiativesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateInitiativeDto) {
    if (new Date(data.endDate) <= new Date(data.startDate)) {
      throw new BadRequestException('endDate must be after startDate');
    }

    return this.prisma.initiative.create({ data });
  }

  async findAll() {
    return this.prisma.initiative.findMany({
      include: { tasks: true },
    });
  }

  async findOne(id: string) {
    const initiative = await this.prisma.initiative.findUnique({
      where: { id },
      include: { tasks: true },
    });

    if (!initiative) throw new NotFoundException('Initiative not found');
    return initiative;
  }

  async update(id: string, data: UpdateInitiativeDto) {
    await this.findOne(id);
    return this.prisma.initiative.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.initiative.delete({ where: { id } });
  }

  async getProgress(id: string) {
    const initiative = await this.findOne(id);

    const tasks = initiative.tasks;
    if (tasks.length === 0) return { progress: 0 };

    const total = tasks.reduce((sum, t) => sum + t.completionPercentage, 0);
    const progress = Math.round(total / tasks.length);

    return { progress };
  }
}
