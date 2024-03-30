using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Core.Interfaces;
using Core.Specification;
using API.Dtos;
using AutoMapper;
using API.Errors;
using API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Core.Entities.Identity;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductBrand> _brandRepo;
        private readonly IGenericRepository<ProductType> _typeRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productRepo,
        IGenericRepository<ProductBrand> brandRepo,
        IGenericRepository<ProductType> typeRepo,
        IMapper mapper)
        {
            this._productRepo = productRepo;
            this._brandRepo = brandRepo;
            this._typeRepo = typeRepo;
            this._mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
            [FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductWithTypesAndBrandsSpecification(productParams);
            var countSpec = new ProductWithFiltersForCountSpecification(productParams);
            var totalItems = await _productRepo.CountAsync(countSpec);
            var products = await _productRepo.ListAsync(spec);
            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);
            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductWithTypesAndBrandsSpecification(id);
            var product = await _productRepo.GetEntityWithSpec(spec);
            if (product == null) return NotFound(new ApiResponse(404));
            return _mapper.Map<Product, ProductToReturnDto>(product);
        }
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _brandRepo.ListAllAsync());
        }
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _typeRepo.ListAllAsync());
        }

        // Product CUD
        // post product
        [Authorize(Roles = AppRole.Manager)]
        [HttpPost]
        public async Task<ActionResult<ProductToReturnDto>> AddProduct(Product product)
        {
            var check = await _productRepo.AddAsync(product);
            if (!check) return NotFound(new ApiResponse(404));
            var id = product.Id;
            var spec = new ProductWithTypesAndBrandsSpecification(id);
            var productToReturn = await _productRepo.GetEntityWithSpec(spec);
            return _mapper.Map<Product, ProductToReturnDto>(productToReturn);
        }

        // put product (update)
        // [Authorize(Roles = AppRole.Manager)]
        [HttpPut("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> UpdateProduct(int id, Product product)
        {
            var productEntity = await _productRepo.GetByIdAsync(id);
            if (productEntity == null) return NotFound(new ApiResponse(404));

            productEntity.Name = product.Name;
            productEntity.PictureUrl = product.PictureUrl;
            productEntity.Price = product.Price;
            productEntity.ProductBrandId = product.ProductBrandId;
            productEntity.ProductTypeId = product.ProductTypeId;
            productEntity.Description = product.Description;

            var check = await _productRepo.UpdateAsync(productEntity);
            if (!check) return BadRequest("Can't Update this product");
            var spec = new ProductWithTypesAndBrandsSpecification(id);
            var productToReturn = await _productRepo.GetEntityWithSpec(spec);
            return _mapper.Map<Product, ProductToReturnDto>(productToReturn);
        }
        // delete product
        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            var checkProduct = await _productRepo.GetByIdAsync(id);
            if (checkProduct == null) return BadRequest(new ApiResponse(404));
            var deleted = await _productRepo.DeleteAsync(id);
            if (!deleted) return BadRequest("Can't Delete this product");
            return Ok("Product deleted");
        }

        // Brand and type CUD

        [HttpPost("brands")]
        public async Task<ActionResult<ProductBrand>> AddBrand(ProductBrand brand)
        {
            var check = await _brandRepo.AddAsync(brand);
            if (!check) return NotFound(new ApiResponse(404));
            var id = brand.Id;
            return Ok(await _brandRepo.GetByIdAsync(id));
        }

        [HttpPut("brands/{id}")]
        public async Task<ActionResult<ProductBrand>> UpdateBrand(int id, ProductBrand brand)
        {
            var brandEntity = await _brandRepo.GetByIdAsync(id);
            if (brandEntity == null) return NotFound(new ApiResponse(404));
            brandEntity.Name = brand.Name;
            var check = await _brandRepo.UpdateAsync(brandEntity);
            if (!check) return BadRequest("Can't update this brand");
            return Ok(await _brandRepo.GetByIdAsync(id));
        }
        [HttpDelete("brands/{id}")]
        public async Task<ActionResult<ProductBrand>> DeleteBrand(int id)
        {
            var checkBrand = await _brandRepo.GetByIdAsync(id);
            if (checkBrand == null) return BadRequest(new ApiResponse(404));
            var deleted = await _brandRepo.DeleteAsync(id);
            if (!deleted) return BadRequest("Can't delete this brand");
            return Ok("Brand deleted");
        }



        [HttpPost("types")]
        public async Task<ActionResult<ProductType>> AddType(ProductType type)
        {
            var check = await _typeRepo.AddAsync(type);
            if (!check) return NotFound(new ApiResponse(404));
            var id = type.Id;
            return Ok(await _typeRepo.GetByIdAsync(id));
        }

        [HttpPut("types/{id}")]
        public async Task<ActionResult<ProductType>> UpdateType(int id, ProductType type)
        {
            var typeEntity = await _typeRepo.GetByIdAsync(id);
            if (typeEntity == null) return NotFound(new ApiResponse(404));
            typeEntity.Name = type.Name;
            var check = await _typeRepo.UpdateAsync(typeEntity);
            if (!check) return BadRequest("Can't update this type");
            return Ok(await _typeRepo.GetByIdAsync(id));
        }
        [HttpDelete("types/{id}")]
        public async Task<ActionResult<Type>> DeleteType(int id)
        {
            var checktype = await _typeRepo.GetByIdAsync(id);
            if (checktype == null) return BadRequest(new ApiResponse(404));
            var deleted = await _typeRepo.DeleteAsync(id);
            if (!deleted) return BadRequest("Can't delete this type");
            return Ok("type deleted");
        }
    }
}