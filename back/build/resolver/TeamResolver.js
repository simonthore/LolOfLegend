"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Team_1 = require("../entity/Team");
const typeorm_1 = require("typeorm");
let TeamResolver = class TeamResolver {
    constructor() {
        this.teamRepository = (0, typeorm_1.getRepository)(Team_1.Team);
    }
    teams() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.teamRepository.find();
        });
    }
    createTeam(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTeam = this.teamRepository.create({ name });
            return yield this.teamRepository.save(newTeam);
        });
    }
    updateTeam(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let teamToUpdate = yield this.teamRepository.findOne({ where: { id } });
            if (!teamToUpdate) {
                return null;
            }
            teamToUpdate.name = name;
            // teamToUpdate.description = description;
            return yield this.teamRepository.save(teamToUpdate);
        });
    }
    deleteTeam(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.teamRepository.delete(id);
            return result.affected !== 0;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Team_1.Team]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "teams", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Team_1.Team),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "createTeam", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Team_1.Team),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "updateTeam", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TeamResolver.prototype, "deleteTeam", null);
TeamResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TeamResolver);
exports.TeamResolver = TeamResolver;
