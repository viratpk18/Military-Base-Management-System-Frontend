import { useState, useEffect } from "react"
import { useAssetBase } from "../../context/AssetBaseContext"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function AssetModal({ isOpen, onClose, onSave, asset, mode }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    unit: "",
    description: "",
    quantity: 1,
    base: ""
  })

  const { bases } = useAssetBase();

  useEffect(() => {
    if (asset && mode === "edit") {
      setFormData({
        ...asset,
        quantity: asset.quantity || 1,
        base: asset.base?._id || ""
      })
    } else {
      setFormData({
        name: "",
        category: "",
        unit: "",
        description: "",
        quantity: 1,
        base: bases[0]?._id || ""
      })
    }
  }, [asset, mode, bases])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Asset" : "Edit Asset"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new asset to your system."
              : "Edit the selected asset."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="col-span-3 border rounded px-2 py-1"
                required
              >
                <option value="" disabled>Select category</option>
                <option value="weapon">Weapon</option>
                <option value="vehicle">Vehicle</option>
                <option value="ammunition">Ammunition</option>
                <option value="equipment">Equipment</option>
              </select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right">
                Unit
              </Label>
              <Input
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                value={formData.quantity}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="base" className="text-right">
                Base
              </Label>
              <select
                id="base"
                name="base"
                value={formData.base}
                onChange={handleChange}
                className="col-span-3 border rounded px-2 py-1"
                required
              >
                <option value="" disabled>Select base</option>
                {bases.map((base) => (
                  <option key={base._id} value={base._id}>{base.name} - {base.district}, {base.state}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === "create" ? "Create" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
