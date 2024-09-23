import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { ArticleRepository } from '../../repository/articleRepository';

@ValidatorConstraint({ name: 'nameArticleValidate', async: false })
export class NameArticleUniqueValidate implements ValidatorConstraintInterface {
    private readonly articleRepository = ArticleRepository
    
   async validate(nameArticle: string, args: ValidationArguments) {
        const article = await this.articleRepository.findOne({where : {name : nameArticle}})
        return !article
    }

    defaultMessage(args: ValidationArguments) {
        return 'Article name already exists';
    }
}