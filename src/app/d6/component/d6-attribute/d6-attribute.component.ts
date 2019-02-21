import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {D6Attribute} from '../../interface/d6-attribute';
import {MatDialog} from '@angular/material';
import {D6AttributeDialogComponent} from '../../dialog/d6-attribute-dialog/d6-attribute-dialog.component';
import {D6CharacterService} from '../../service/d6-character.service';

@Component({
  selector: 'prf-d6-attribute',
  templateUrl: './d6-attribute.component.html',
  styleUrls: ['./d6-attribute.component.scss']
})
export class D6AttributeComponent implements OnInit {

  @Input()
  public label = 'Label';

  @Input()
  public attribute: D6Attribute;

  @Output()
  public save: EventEmitter<D6Attribute> = new EventEmitter<D6Attribute>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openAttributeDialog(label: string) {
    const dialog = this.dialog.open(D6AttributeDialogComponent, { data: { label: label, attribute: this.attribute } });

    dialog.afterClosed().subscribe((x) => {
      if (x) {
        this.save.emit(x);
      }
    });
  }
}
