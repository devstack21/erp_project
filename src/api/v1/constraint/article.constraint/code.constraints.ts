import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { ArticleRepository } from '../../repository/articleRepository';

@ValidatorConstraint({ name: 'codeArticleValidate', async: false })
export class CodeArticleUniqueValidate implements ValidatorConstraintInterface {
    private readonly articleRepository = ArticleRepository
    
   async validate(code: string, args: ValidationArguments) {
        const article = await this.articleRepository.findOne({where : {code : code}})
        return !article
    }

    defaultMessage(args: ValidationArguments) {
        return 'Article code already exists';
    }
}