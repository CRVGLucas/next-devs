import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EditLessonComponent } from "./edit-lesson.component";

describe('EditLessonComponent', () => {
    let component: EditLessonComponent;
    let fixture: ComponentFixture<EditLessonComponent>;
    beforeEach( async() => {
        await TestBed.configureTestingModule({
            declarations: [EditLessonComponent]
        }).compileComponents()
    })

    it(`Should get id lesson`, () => {
        expect(EditLessonComponent.idLesson)
    })
});
