import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from '@prisma/client';
import { InitiativesService } from '../initiatives/initiatives.service';

@Injectable()
export class TasksService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly initiativesService: InitiativesService,
    ) {}

    async create(data: CreateTaskDto) {
        const initiative = await this.initiativesService.findOne(data.initiativeId);

        const dueDate = new Date(data.dueDate);
        if (dueDate < initiative.startDate || dueDate > initiative.endDate) {
            throw new BadRequestException('Task due date must be within initiative date range');
        }

        const syncedData = this.syncTaskStatusAndProgress(data);

        return this.prisma.task.create({
            data: syncedData as CreateTaskDto,
        });
    }

    async findAll() {
        return this.prisma.task.findMany({
            include: { initiative: true },
        });
    }

    async findOne(id: string) {
        const task = await this.prisma.task.findUnique({
            where: { id },
            include: { initiative: true },
        });
        if (!task) throw new NotFoundException('Task not found');
        return task;
    }

    async update(id: string, data: UpdateTaskDto) {
        const existing = await this.findOne(id);

        if (data.dueDate) {
            const dueDate = new Date(data.dueDate);
            const { startDate, endDate } = existing.initiative;
            if (dueDate < startDate || dueDate > endDate) {
                throw new BadRequestException('Task due date must be within initiative date range');
            }
        }

        const syncedData = this.syncTaskStatusAndProgress(data);

        return this.prisma.task.update({
            where: { id },
            data: syncedData,
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.task.delete({ where: { id } });
    }

    private syncTaskStatusAndProgress(data: Partial<CreateTaskDto | UpdateTaskDto>) {
        const updated = { ...data };

        if (updated.completionPercentage === 100) {
            updated.status = TaskStatus.Done;
        } else if (updated.status === TaskStatus.Done) {
            updated.completionPercentage = 100;
        }

        return updated;
    }
}
