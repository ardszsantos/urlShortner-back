import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { Response } from 'express';

@ApiTags('url')
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @ApiOperation({ summary: 'Shorten a URL' })
  @ApiBody({ type: CreateUrlDto })
  @Post()
  async shortenUrl(@Body() createUrlDto: CreateUrlDto): Promise<string> {
    return this.urlService.shortenUrl(createUrlDto);
  }

  @ApiOperation({ summary: 'Redirect to the original URL' })
  @ApiParam({ name: 'code', description: 'The short URL code' })
  @Get(':code')
  async redirect(@Param('code') code: string, @Res() res: Response) {
    const longUrl = await this.urlService.redirect(code);
    if (longUrl) {
      res.redirect(longUrl);
    } else {
      res.status(404).send('URL not found');
    }
  }
}
