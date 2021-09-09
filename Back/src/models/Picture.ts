import { getModelForClass, Prop } from '@typegoose/typegoose';
import path from 'path';
import { Stream } from 'stream';

import { ObjectType, Field, ID, InputType } from 'type-graphql';
import writeFileToPicturesDirectory from '../services/utils';

@ObjectType()
export class Picture {
    @Prop()
    @Field()
    _id!: string;

    @Prop()
    @Field(() => ID)
    id!: string;

    @Prop()
    @Field(() => String)
    extension!: string;
}

export const PictureModel = getModelForClass(Picture);

@InputType()
export class UploadFileInput {
    @Field(() => Stream)
    stream!: Stream;

    @Field()
    filename!: string;

    @Field()
    mimetype!: string;

    @Field()
    encoding!: string;
}

const saveAndWritePictureToFile = async (
    originalFilename: string,
    stream: Stream
): Promise<Picture> => {
    const extension = path.extname(originalFilename);
    const picture = PictureModel.create({ extension });
    await (await picture).save();
    const newFilename = `${(await picture).id}${extension}`;
    await writeFileToPicturesDirectory(stream, newFilename);
    return picture;
};

export { saveAndWritePictureToFile };
