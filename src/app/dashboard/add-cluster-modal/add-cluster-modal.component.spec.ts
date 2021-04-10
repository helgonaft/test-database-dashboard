import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddClusterModalComponent } from "./add-cluster-modal.component";

describe("AddClusterModalComponent", () => {
  let component: AddClusterModalComponent;
  let fixture: ComponentFixture<AddClusterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddClusterModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClusterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
