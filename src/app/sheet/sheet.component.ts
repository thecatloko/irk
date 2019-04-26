import { Component, OnInit } from '@angular/core';

import { Race } from '../models/race'
import { RaceService } from '../services/race.service'

import { Archetype } from '../models/archetype'
import { ArchetypeBenefit } from '../models/archetypeBenefit'
import { ArchetypeService } from '../services/archetype.service'

import { Career } from '../models/career'
import { Hability } from '../models/hability'
import { CareerService } from '../services/career.service'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css']
})
export class SheetComponent implements OnInit {

  races: Race[];
  selectedRace: Race;

  archetypes: Archetype[];
  selectedArchetype: Archetype;
  archetypeBenefitList: ArchetypeBenefit[];

  careers: Career[];
  firstCareer: Career;
  secondCareer: Career;
  habilityList: Hability[];

  constructor(private raceService: RaceService,
    private archetypeService: ArchetypeService,
    private careerService: CareerService) { }

  ngOnInit() {
    this.getRaces();
    this.getArchetypes();
    this.getCareers();
  }
 
  getRaces(): void {
    this.raceService.getRaces()
        .subscribe(races => this.races = races);
  }
 
  getArchetypes(): void {
    this.archetypeService.getAchetypes()
        .subscribe(archetypes => {
          this.archetypes = archetypes;
          this.selectedArchetype = archetypes[2];
          this.getAchetypeBenefits(this.selectedArchetype.id);
        },
        error => {
          this.archetypes = [
            {
              'id' : 0,
              'name' : 'Arquétipo Teste 1',
              'description' : 'Descrição do arquétipo teste 1',
            }
          ];
        });
  }
 
  getAchetypeBenefits(id: number): void {
    this.archetypeService.getAchetypeBenefits(id)
        .subscribe(archetypeBenefitList => this.archetypeBenefitList = archetypeBenefitList);
  }
 
  getCareers(): void {
    this.careerService.getCareers()
        .subscribe(careers => {
          this.careers = careers
          this.firstCareer = careers[38];
          this.secondCareer = careers[29];
          this.getHabilities(this.firstCareer.id, this.secondCareer.id);
        },
        error => {
          this.careers = [
            {
              'id' : 0,
              'name' : 'Carreira Teste 1',
            },
            {
              'id' : 1,
              'name' : 'Carreira Teste 2',
            }
          ];
        });
  }
 
  getHabilities(firstId: number, secondId: number): void {
    this.careerService.getHabilities(firstId, secondId)
        .subscribe(habilityList => this.habilityList = habilityList);
  }
  
  changeArchetype(event) {
    this.getAchetypeBenefits(event.value.id);
  }
  
  changeCareer(event) {
    if (this.firstCareer && this.secondCareer) {
      this.careerService.getHabilities(this.firstCareer.id, this.secondCareer.id)
        .subscribe(habilityList => this.habilityList = habilityList)
    }
  }
}
