//
//  MCDUButtonGrid.swift
//  A32NX MCDU
//
//  Created by Tyler Knox on 2/7/21.
//

import UIKit

class MCDUButtonGrid: UIStackView {

    @IBInspectable var events:String = ""
    @IBInspectable var cols:Int = 1

    override func didMoveToWindow() {
        super.didMoveToWindow()
        let eventsArray = events.components(separatedBy: ",")
        let rows = eventsArray.count / cols

        for i in 0...(rows-1) {
            let row = MCDUButtonGroup(frame: .zero)
            row.events = eventsArray[(i*cols)...((i*cols)+cols)-1].joined(separator: ",")
            row.distribution = .fillEqually
            row.alignment = .fill
            row.spacing = .zero
            addArrangedSubview(row)
        }

    }
}
