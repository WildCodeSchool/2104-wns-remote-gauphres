import { GraphQLUpload } from 'graphql-upload';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import {
    Picture,
    PictureModel,
    saveAndWritePictureToFile,
    UploadFileInput,
} from '../models/Picture';

@Resolver()
export default class PictureResolver {
    @Query(() => [Picture])
    async pictures(): Promise<Picture[]> {
        return PictureModel.find();
    }

    @Mutation(() => Picture)
    async uploadPicture(
        @Arg('file', () => GraphQLUpload)
        file: UploadFileInput
    ): Promise<Picture> {
        const { filename, stream } = file;
        console.log(filename);
        console.log(stream);

        return saveAndWritePictureToFile(filename, stream);
    }
}
