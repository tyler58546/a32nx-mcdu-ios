//
//  MCDUButtonGroup.swift
//  A32NX MCDU
//
//  Created by Tyler Knox on 2/7/21.
//

import UIKit

class MCDUButtonGroup: UIStackView {

    @IBInspectable var events:String = ""

    override func didMoveToWindow() {
        super.didMoveToWindow()
        let eventsArray = events.components(separatedBy: ",")
        print(eventsArray)
        for e in eventsArray {
            let button = MCDUButton(eventName: e)
            button.setTitle("", for: .normal)
            addArrangedSubview(button)
        }
    }
}
