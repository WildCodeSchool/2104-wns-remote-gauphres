import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Hobby } from '../models/Hobby';

@Resolver(Hobby)
export class HobbyResolver {}
