import {
    Controller, Get, Query,
} from '@nestjs/common';

import { CategoryConstants } from '../config/constants';
import { CategoryService } from './category.service';
import { Category } from 'entity/category.entity';

@Controller()
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ) {}

    @Get('/api/v1/categories/search')
    async search(@Query('name') name: string) {
        if (!name || name.length > CategoryConstants.CATEGORY_MAX_LENGTH) {
            return [];
        }
        name = decodeURIComponent(name);
        const categories: Array<Category> = await this.categoryService.searchByName(name);
        return categories;
    }
}