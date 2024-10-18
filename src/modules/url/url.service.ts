import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';
import { CreateUrlDto } from './dto/create-url.dto';

@Injectable()
export class UrlService {
  constructor(@InjectRepository(Url) private urlRepository: Repository<Url>) {}

  async shortenUrl(createUrlDto: CreateUrlDto): Promise<string> {
    const { longUrl } = createUrlDto;
    const urlCode = this.generateCode();
    const shortUrl = `${process.env.BASE_URL}/url/${urlCode}`;

    const url = this.urlRepository.create({
      longUrl,
      shortUrl,
      urlCode,
    });

    await this.urlRepository.save(url);
    return shortUrl;
  }

  private generateCode(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  async redirect(code: string): Promise<string> {
    const url = await this.urlRepository.findOne({ where: { urlCode: code } });
    if (url) {
      url.visits++;
      this.urlRepository.save(url);
      return url.longUrl;
    } else {
      throw new Error('URL not found');
    }
  }
}
