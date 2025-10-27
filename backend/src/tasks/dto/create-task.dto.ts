import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, IsUUID } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDateString()
    dueDate: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;

    @IsInt()
    @Min(0)
    @Max(100)
    @IsOptional()
    completionPercentage?: number;

    @IsUUID()
    initiativeId: string;
}
