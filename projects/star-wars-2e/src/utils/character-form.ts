import { FormControl, FormGroup } from "@angular/forms";

export const characterForm = () => {
    return new FormGroup({
        // Character base fields
        id: new FormControl(''),
        game: new FormControl(''),
        name: new FormControl(''),
        description: new FormControl(''),
        created: new FormControl(0),
        modified: new FormControl(0),

        // General information
        general: new FormGroup({
            gender: new FormControl(''),
            species: new FormControl(''),
            homeWorld: new FormControl(''),
            age: new FormControl(0),
            height: new FormControl(0),
            weight: new FormControl(0),
            physicalDescription: new FormControl(''),
            personality: new FormControl(''),
            background: new FormControl(''),
            objectives: new FormControl(''),
            quote: new FormControl(''),
        }),

        // Character points
        characterPoints: new FormControl(0),

        // Attributes
        attributes: new FormGroup({
            dexterity: new FormControl({ value: 3, skills: [] }),
            knowledge: new FormControl({ value: 3, skills: [] }),
            mechanical: new FormControl({ value: 3, skills: [] }),
            perception: new FormControl({ value: 3, skills: [] }),
            strength: new FormControl({ value: 3, skills: [] }),
            technical: new FormControl({ value: 3, skills: [] }),
        }),

        // Inventory
        inventory: new FormGroup({
            equipment: new FormControl([]),
            weapons: new FormControl([]),
            credits: new FormControl(0),
        }),

        // Force
        force: new FormControl({
            sensitive: false,
            points: 0,
            darkSide: 0,
            abilities: [],
        }),

        // Abilities
        abilities: new FormControl([]),

        // Speed
        speed: new FormControl(0),
    })
};