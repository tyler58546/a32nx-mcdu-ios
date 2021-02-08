//
//  MCDUButton.swift
//  A32NX MCDU
//
//  Created by Tyler Knox on 2/7/21.
//

import UIKit

class MCDUButton: UIButton {

    required init(eventName:String) {
        self.eventName = eventName

        super.init(frame: .zero)//CGRect(x: 100, y: 100, width: 100, height: 50))
        contentHorizontalAlignment = .fill
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }

    var vc:ViewController? = nil
    @IBInspectable var eventName:String = ""

    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        super.touchesEnded(touches, with: event)
        vc?.sendEvent(eventName: self.eventName)
        let impactMed = UIImpactFeedbackGenerator(style: .medium)
        impactMed.impactOccurred()
    }
    
    override func didMoveToWindow() {
        super.didMoveToWindow()

        var viewController: UIViewController? {
            var nextResponder: UIResponder? = self
            repeat {
                nextResponder = nextResponder?.next

                if let viewController = nextResponder as? ViewController {
                    return viewController
                }

            } while nextResponder != nil

            return nil
        }
        
        self.vc = viewController as? ViewController
        

        }

}
