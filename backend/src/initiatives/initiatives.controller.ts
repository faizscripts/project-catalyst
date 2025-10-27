import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InitiativesService } from './initiatives.service';
import { CreateInitiativeDto } from './dto/create-initiative.dto';
import { UpdateInitiativeDto } from './dto/update-initiative.dto';

@Controller('initiatives')
export class InitiativesController {
    constructor(private readonly initiativesService: InitiativesService) {}

    @Post()
    create(@Body() dto: CreateInitiativeDto) {
        return this.initiativesService.create(dto);
    }

    @Get()
    findAll() {
        return this.initiativesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.initiativesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateInitiativeDto) {
        return this.initiativesService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.initiativesService.remove(id);
    }

    @Get(':id/progress')
    getProgress(@Param('id') id: string) {
        return this.initiativesService.getProgress(id);
    }
}
